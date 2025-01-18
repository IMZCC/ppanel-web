'use client';

import { Display } from '@/components/display';
import Renewal from '@/components/subscribe/renewal';
import ResetTraffic from '@/components/subscribe/reset-traffic';
import Unsubscribe from '@/components/subscribe/unsubscribe';
import useGlobalStore from '@/config/use-global';
import { getStat } from '@/services/common/common';
import { queryApplicationConfig } from '@/services/user/subscribe';
import { queryUserSubscribe } from '@/services/user/user';
import { getPlatform } from '@/utils/common';
import { useQuery } from '@tanstack/react-query';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@workspace/ui/components/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@workspace/ui/components/alert-dialog';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Icon } from '@workspace/ui/custom-components/icon';
import { isBrowser } from '@workspace/ui/utils';
import { differenceInDays } from 'date-fns';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import Subscribe from '../subscribe/page';

const platforms: (keyof API.ApplicationPlatform)[] = [
  'windows',
  'mac',
  'linux',
  'ios',
  'android',
  'harmony',
];

export default function Content() {
  const t = useTranslations('dashboard');
  const { getUserSubscribe, getAppSubLink } = useGlobalStore();

  const [protocol, setProtocol] = useState('');

  const { data: userSubscribe = [] } = useQuery({
    queryKey: ['queryUserSubscribe'],
    queryFn: async () => {
      const { data } = await queryUserSubscribe();
      return data.data?.list || [];
    },
  });
  const { data: applications } = useQuery({
    queryKey: ['queryApplicationConfig'],
    queryFn: async () => {
      const { data } = await queryApplicationConfig();
      return data.data?.applications || [];
    },
  });
  const [platform, setPlatform] = useState<keyof API.ApplicationPlatform>(getPlatform());

  const { data } = useQuery({
    queryKey: ['getStat'],
    queryFn: async () => {
      const { data } = await getStat({
        skipErrorHandler: true,
      });
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {userSubscribe.length ? (
        <>
          <h2 className='flex items-center gap-1.5 font-semibold'>
            <Icon icon='uil:servers' className='size-5' />
            {t('mySubscriptions')}
          </h2>
          <div className='flex flex-wrap justify-between gap-4'>
            <Tabs
              value={platform}
              onValueChange={(value) => setPlatform(value as keyof API.ApplicationPlatform)}
              className='w-full max-w-full md:w-auto'
            >
              <TabsList className='flex *:flex-auto'>
                {platforms.map((item) => (
                  <TabsTrigger value={item} key={item} className='px-1 lg:px-3'>
                    <Icon
                      icon={`${
                        {
                          windows: 'mdi:microsoft-windows',
                          mac: 'uil:apple',
                          linux: 'uil:linux',
                          ios: 'simple-icons:ios',
                          android: 'uil:android',
                          harmony: 'simple-icons:harmonyos',
                        }[item]
                      }`}
                      className='size-5'
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {data?.protocol && data?.protocol.length > 1 && (
              <Tabs
                value={protocol}
                onValueChange={setProtocol}
                className='w-full max-w-full md:w-auto'
              >
                <TabsList className='flex *:flex-auto'>
                  {['all', ...(data?.protocol || [])].map((item) => (
                    <TabsTrigger
                      value={item === 'all' ? '' : item}
                      key={item}
                      className='px-1 uppercase lg:px-3'
                    >
                      {item}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>
          {userSubscribe.map((item) => (
            <Card key={item.id}>
              <CardHeader className='flex flex-row flex-wrap items-center justify-between gap-2 space-y-0'>
                <CardTitle className='font-medium'>{item.subscribe.name}</CardTitle>
                <div className='flex flex-wrap gap-2'>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size='sm' variant='destructive'>
                        {t('resetSubscription')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('prompt')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('confirmResetSubscription')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => toast.success(t('resetSuccess'))}>
                          {t('confirm')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <ResetTraffic id={item.id} replacement={item.subscribe.replacement} />
                  <Renewal id={item.id} subscribe={item.subscribe} />
                  <Unsubscribe id={item.id} allowDeduction={item.subscribe.allow_deduction} />
                </div>
              </CardHeader>
              <CardContent>
                <ul className='grid grid-cols-2 gap-3 *:flex *:flex-col *:justify-between lg:grid-cols-4'>
                  <li>
                    <span className='text-muted-foreground'>{t('used')}</span>
                    <span className='text-2xl font-bold'>
                      <Display
                        type='traffic'
                        value={item.upload + item.download}
                        unlimited={!item.traffic}
                      />
                    </span>
                  </li>
                  <li>
                    <span className='text-muted-foreground'>{t('totalTraffic')}</span>
                    <span className='text-2xl font-bold'>
                      <Display type='traffic' value={item.traffic} unlimited={!item.traffic} />
                    </span>
                  </li>
                  <li>
                    <span className='text-muted-foreground'>{t('nextResetDays')}</span>
                    <span className='text-2xl font-semibold'>
                      {item.reset_time
                        ? differenceInDays(new Date(item.reset_time), new Date())
                        : t('unknown')}
                    </span>
                  </li>
                  <li>
                    <span className='text-muted-foreground'>{t('expirationDays')}</span>
                    <span className='text-2xl font-semibold'>
                      {item.expire_time
                        ? differenceInDays(new Date(item.expire_time), new Date()) || t('unknown')
                        : t('noLimit')}
                    </span>
                  </li>
                </ul>
                <Separator className='mt-4' />
                <Accordion type='single' collapsible defaultValue='0' className='w-full'>
                  {getUserSubscribe(item.token, protocol)?.map((url, index) => (
                    <AccordionItem key={url} value={String(index)}>
                      <AccordionTrigger className='hover:no-underline'>
                        <div className='flex w-full flex-row items-center justify-between'>
                          <CardTitle className='text-sm font-medium'>
                            {t('subscriptionUrl')} {index + 1}
                          </CardTitle>

                          <CopyToClipboard
                            text={url}
                            onCopy={(text, result) => {
                              if (result) {
                                toast.success(t('copySuccess'));
                              }
                            }}
                          >
                            <span
                              className='text-primary hover:bg-accent mr-4 flex cursor-pointer rounded p-2 text-sm'
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Icon icon='uil:copy' className='mr-2 size-5' />
                              {t('copy')}
                            </span>
                          </CopyToClipboard>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                          {applications
                            ?.filter((application) => {
                              const platformApps = application.platform?.[platform];
                              return platformApps && platformApps.length > 0;
                            })
                            .map((application) => {
                              const platformApps = application.platform?.[platform];
                              const app =
                                platformApps?.find((item) => item.is_default) || platformApps?.[0];
                              if (!app) return null;

                              const handleCopy = (text: string, result: boolean) => {
                                if (result) {
                                  const href = getAppSubLink(application.subscribe_type, url);
                                  const showSuccessMessage = () => {
                                    toast.success(
                                      <>
                                        <p>{t('copySuccess')}</p>
                                        <p>{t('manualImportMessage')}</p>
                                      </>,
                                    );
                                  };

                                  if (isBrowser() && href) {
                                    window.location.href = href;
                                    const checkRedirect = setTimeout(() => {
                                      if (window.location.href !== href) {
                                        showSuccessMessage();
                                      }
                                      clearTimeout(checkRedirect);
                                    }, 1000);
                                    return;
                                  }

                                  showSuccessMessage();
                                }
                              };

                              return (
                                <div
                                  key={application.name}
                                  className='text-muted-foreground flex size-full flex-col items-center justify-between gap-2 text-xs'
                                >
                                  <span>{application.name}</span>

                                  {application.icon && (
                                    <Image
                                      src={application.icon}
                                      alt={application.name}
                                      width={64}
                                      height={64}
                                      className='p-1'
                                    />
                                  )}
                                  <div className='flex'>
                                    <Button
                                      size='sm'
                                      variant='secondary'
                                      className='rounded-r-none px-1.5'
                                      asChild
                                    >
                                      <Link href={app.url}>{t('download')}</Link>
                                    </Button>

                                    <CopyToClipboard text={url} onCopy={handleCopy}>
                                      <Button size='sm' className='rounded-l-none p-2'>
                                        {t('import')}
                                      </Button>
                                    </CopyToClipboard>
                                  </div>
                                </div>
                              );
                            })}
                          <div className='text-muted-foreground hidden size-full flex-col items-center justify-between gap-2 text-sm lg:flex'>
                            <span>{t('qrCode')}</span>
                            <QRCodeCanvas
                              value={url}
                              size={80}
                              bgColor='transparent'
                              fgColor='rgb(59, 130, 246)'
                            />
                            <span className='text-center'>{t('scanToSubscribe')}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <>
          <h2 className='flex items-center gap-1.5 font-semibold'>
            <Icon icon='uil:shop' className='size-5' />
            {t('purchaseSubscription')}
          </h2>
          <Subscribe />
        </>
      )}
    </>
  );
}
