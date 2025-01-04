'use client';

import { Display } from '@/components/display';
import useGlobalStore from '@/config/use-global';
import { checkoutOrder, resetTraffic } from '@/services/user/order';
import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import PaymentMethods from './payment-methods';

interface ResetTrafficProps {
  id: number;
  replacement?: number;
}
export default function ResetTraffic({ id, replacement }: Readonly<ResetTrafficProps>) {
  const t = useTranslations('subscribe');
  const { getUserInfo } = useGlobalStore();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [params, setParams] = useState<API.ResetTrafficOrderRequest>({
    payment: 'balance',
    user_subscribe_id: id,
  });
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    if (id) {
      setParams((prev) => ({
        ...prev,
        quantity: 1,
        user_subscribe_id: id,
      }));
    }
  }, [id]);

  if (!replacement) return;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='sm'>
          {t('resetTraffic')}
        </Button>
      </DialogTrigger>
      <DialogContent className='flex h-full flex-col overflow-hidden md:h-auto'>
        <DialogHeader>
          <DialogTitle>{t('resetTrafficTitle')}</DialogTitle>
          <DialogDescription>{t('resetTrafficDescription')}</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col justify-between text-sm'>
          <div className='grid gap-3'>
            <div className='flex justify-between font-semibold'>
              <span>{t('resetPrice')}</span>
              <span>
                <Display type='currency' value={replacement} />
              </span>
            </div>
            <PaymentMethods
              value={params.payment}
              onChange={(value) => {
                setParams({
                  ...params,
                  payment: value,
                });
              }}
            />
          </div>
          <Button
            className='fixed bottom-0 left-0 w-full rounded-none md:relative md:mt-6'
            disabled={loading}
            onClick={async () => {
              startTransition(async () => {
                try {
                  const response = await resetTraffic(params);
                  const orderNo = response.data.data?.order_no;
                  if (orderNo) {
                    const { data } = await checkoutOrder({
                      orderNo,
                    });
                    const type = data.data?.type;
                    const checkout_url = data.data?.checkout_url;
                    if (type === 'link') {
                      const width = 600;
                      const height = 800;
                      const left = (screen.width - width) / 2;
                      const top = (screen.height - height) / 2;
                      window.open(
                        checkout_url,
                        'newWindow',
                        `width=${width},height=${height},top=${top},left=${left},menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1`,
                      );
                    }
                    getUserInfo();
                    router.push(`/payment?order_no=${orderNo}`);
                  }
                } catch (error) {
                  console.log(error);
                }
              });
            }}
          >
            {loading && <LoaderCircle className='mr-2 animate-spin' />}
            {t('buyNow')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
