import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';


const companyData = {
    name: 'TransAtlantic Logistics',
    contactPerson: 'John Smith',
    email: 'contact@transatlantic.com',
    phone: '(312) 555-0198',
    address: '1234 S Wabash Ave',
    city: 'Chicago',
    state: 'Illinois',
    zip: '60605',
    mcLicense: 'MC-1234567',
    dotNumber: 'DOT-9876543',
    description: 'We specialize in long-distance furniture transportation with over 10 years of experience. Our team of professionals ensures safe and timely delivery of your precious items.',
};

export const CompanyInformation = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">
          Company Information
        </h2>
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Reset</Button>
            <Button variant="primary" size="sm">Save Changes</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <form className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Input label="Company Name" defaultValue={companyData.name} />
          <Input label="Contact Person" defaultValue={companyData.contactPerson} />
          <Input label="Email Address" type="email" defaultValue={companyData.email} />
          <Input label="Phone Number" type="tel" defaultValue={companyData.phone} />
          <Input label="Address" defaultValue={companyData.address} />
          <Input label="City" defaultValue={companyData.city} />
          <Input label="State" defaultValue={companyData.state} />
          <Input label="ZIP Code" defaultValue={companyData.zip} />
          <Input label="MC License Number" defaultValue={companyData.mcLicense} />
          <Input label="DOT Number" defaultValue={companyData.dotNumber} />
          <div className="md:col-span-2">
              <Textarea label="Company Description" defaultValue={companyData.description} />
          </div>
        </form>
      </div>
    </div>
  );
}
