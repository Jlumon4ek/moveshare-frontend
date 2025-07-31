import { useState, useEffect, type ChangeEvent } from 'react';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { companyApi, type CompanyData } from '../../../shared/api/company';
import { toastStore } from '../../../shared/lib/toast/toastStore';


const initialFormState: CompanyData = {
    company_name: '', contact_person: '', email_address: '', phone_number: '',
    address: '', city: '', state: '', zip_code: '',
    mc_license_number: '', dot_number: '', company_description: '',
};

export const CompanyInformation = () => {
  const [initialData, setInitialData] = useState<CompanyData>(initialFormState);
  const [formData, setFormData] = useState<CompanyData>(initialFormState);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        const data = await companyApi.getCompanyInfo();
        setInitialData(data);
        setFormData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch company data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanyData();
  }, []);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({...prev, [name]: value}));
  };

  const handleReset = () => {
      setFormData({
          ...initialData,
          email_address: formData.email_address
      });
  };
  
  const handleSaveChanges = async () => {
      try {
          setIsSaving(true);
          await companyApi.updateCompanyInfo(formData);
          setInitialData(formData);
          toastStore.show('Company information updated successfully!', 'success');
      } catch (err) {
          toastStore.show('Failed to save changes.', 'error');
      } finally {
          setIsSaving(false);
      }
  };

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  
  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">Company Information</h2>
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleReset} disabled={isSaving}>Reset</Button>
            <Button variant="primary" size="sm" onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
          <form className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <Input name="company_name" label="Company Name" value={formData.company_name} onChange={handleInputChange} placeholder="Your Company LLC" />
            <Input name="contact_person" label="Contact Person" value={formData.contact_person} onChange={handleInputChange} placeholder="John Doe" />
            <Input name="email_address" label="Email Address" type="email" value={formData.email_address} onChange={handleInputChange} placeholder="contact@yourcompany.com" disabled />
            <Input name="phone_number" label="Phone Number" type="tel" value={formData.phone_number} onChange={handleInputChange} placeholder="(555) 123-4567" />
            <Input name="address" label="Address" value={formData.address} onChange={handleInputChange} placeholder="123 Main St" />
            <Input name="city" label="City" value={formData.city} onChange={handleInputChange} placeholder="Anytown" />
            <Input name="state" label="State" value={formData.state} onChange={handleInputChange} placeholder="CA" />
            <Input name="zip_code" label="ZIP Code" value={formData.zip_code} onChange={handleInputChange} placeholder="12345" />
            <Input name="mc_license_number" label="MC License Number" value={formData.mc_license_number} onChange={handleInputChange} placeholder="MC-1234567" />
            <Input name="dot_number" label="DOT Number" value={formData.dot_number} onChange={handleInputChange} placeholder="DOT-9876543" />
            <div className="md:col-span-2">
                <Textarea name="company_description" label="Company Description" value={formData.company_description} onChange={handleInputChange} placeholder="Describe your company's services..." />
            </div>
          </form>
      </div>
    </div>
  );
};
