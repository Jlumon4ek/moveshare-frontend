import { Button } from '../../shared/ui/Button/Button';
import { Input } from '../../shared/ui/Input/Input';
import { Select } from '../../shared/ui/Select/Select';

const currencyOptions = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'KZT', label: 'Tenge (KZT)' },
];

export const SystemSettings = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">System Settings</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Input label="Platform Name" placeholder="MoveShare" value="MoveShare" disabled />
        <Input label="Commission Rate (%)" placeholder="7.5" value="7.5" />
        <Select label="New User Approval" options={[{ value: 'manual', label: 'Manual Approval' }, { value: 'auto', label: 'Auto Approve' }]} />
        <Input label="Minimum Payout" placeholder="500" value="500" />
        <Input label="Job Expiration Days" placeholder="14" value="14" />
        <Select label="Default Currency" options={currencyOptions} />
      </div>
      
      <div className="mt-6 flex justify-between items-center pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          <p>
            <span className="font-semibold">Terms of Service:</span>
            <span> Please be sure that all of the above terms are in accordance to your Terms of Service for your users.</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Reset</Button>
          <Button variant="primary" size="sm">Save Settings</Button>
        </div>
      </div>
    </div>
  );
};