export interface Plan {
  id: string;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
  isPopular?: boolean;
}
