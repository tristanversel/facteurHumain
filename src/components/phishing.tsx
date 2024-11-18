import { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import gophishService from '../services/gophishService';


export const Phishing = () => {
  const [campaignData, setCampaignData] = useState<any>({});
    useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await gophishService.getCampaignData();
        setCampaignData(data);
        console.log('Campaigns:', data.timeline);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">PHISHING</h1>
      <Separator className='mb-8 mt-8' />
        <div className="grid grid-cols-1 gap-4">
        {campaignData.timeline?.map((event: any, index: number) => {
          if (event.message !== "Submitted Data") return null;

          let details;
          let mail;
          let password
          try {
            details = JSON.parse(event.details);
            mail = details.payload.email[0];
            password = details.payload.password[0];
          } catch (e) {
            console.error('Error parsing JSON:', e);
            return null;
          }

          return (
            <div key={index} className="p-4 border rounded bg-white">
              <p>Message: {event.message}</p>
              <p>Email: {event.email}</p>
                <p>Mail : {JSON.stringify(mail)}</p>
                <p>Password : {JSON.stringify(password)}</p>
              
            </div>
          );
        })}
          
      
        </div>
    </>
  );
};