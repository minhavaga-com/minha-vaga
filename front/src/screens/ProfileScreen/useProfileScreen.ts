import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '../../lib/firebase';
import { getStorage } from 'firebase/storage';
import type { UserProfile } from './types';

export function useProfileScreen() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [about, setAbout] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const profileRef = doc(db, 'profiles', currentUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const data = profileSnap.data() as UserProfile;
          setProfile(data);
          setDisplayName(data.displayName || '');
          setAbout(data.about || '');
          setGithub(data.github || '');
          setLinkedin(data.linkedin || '');
        } else {
          setDisplayName(currentUser.displayName || '');
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar perfil.' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setMessage({ type: 'error', text: 'Formato de arquivo inválido. Use PDF ou DOC/DOCX.' });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Arquivo muito grande. Máximo 5MB.' });
        return;
      }
      
      setResumeFile(file);
      setMessage(null);
    }
  };

  const uploadResume = async (file: File): Promise<{ url: string; name: string }> => {
    const storage = getStorage();
    const fileExtension = file.name.split('.').pop();
    const fileName = `resume_${currentUser!.uid}_${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `resumes/${currentUser!.uid}/${fileName}`);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return { url: downloadURL, name: file.name };
  };

  const deleteOldResume = async (resumeURL: string) => {
    try {
      const storage = getStorage();
      const oldResumeRef = ref(storage, resumeURL);
      await deleteObject(oldResumeRef);
    } catch (error) {
      console.error('Erro ao deletar currículo antigo:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setMessage({ type: 'error', text: 'Usuário não autenticado.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      let resumeData = {
        resumeURL: profile?.resumeURL,
        resumeName: profile?.resumeName,
      };

      if (resumeFile) {
        setUploadingFile(true);
        
        if (profile?.resumeURL) {
          await deleteOldResume(profile.resumeURL);
        }
        
        const { url, name } = await uploadResume(resumeFile);
        resumeData = { resumeURL: url, resumeName: name };
        setUploadingFile(false);
      }

      const profileData: UserProfile = {
        uid: currentUser.uid,
        displayName,
        email: currentUser.email!,
        photoURL: currentUser.photoURL || undefined,
        about: about.trim() || undefined,
        github: github.trim() || undefined,
        linkedin: linkedin.trim() || undefined,
        ...resumeData,
        updatedAt: new Date(),
      };

      const profileRef = doc(db, 'profiles', currentUser.uid);
      await setDoc(profileRef, profileData, { merge: true });

      setProfile(profileData);
      setResumeFile(null);
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar perfil. Tente novamente.' });
    } finally {
      setSaving(false);
      setUploadingFile(false);
    }
  };

  const handleRemoveResume = async () => {
    if (!currentUser || !profile?.resumeURL) return;

    try {
      setSaving(true);
      await deleteOldResume(profile.resumeURL);

      const profileRef = doc(db, 'profiles', currentUser.uid);
      await setDoc(profileRef, {
        resumeURL: null,
        resumeName: null,
        updatedAt: new Date(),
      }, { merge: true });

      setProfile({ ...profile, resumeURL: undefined, resumeName: undefined });
      setMessage({ type: 'success', text: 'Currículo removido com sucesso!' });
    } catch (error) {
      console.error('Erro ao remover currículo:', error);
      setMessage({ type: 'error', text: 'Erro ao remover currículo.' });
    } finally {
      setSaving(false);
    }
  };

  const dismissMessage = () => {
    setMessage(null);
  };

  return {
    currentUser,
    profile,
    loading,
    saving,
    uploadingFile,
    message,
    displayName,
    setDisplayName,
    about,
    setAbout,
    github,
    setGithub,
    linkedin,
    setLinkedin,
    resumeFile,
    handleFileChange,
    handleSubmit,
    handleRemoveResume,
    dismissMessage,
  };
}

