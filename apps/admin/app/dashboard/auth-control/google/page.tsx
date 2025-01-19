'use client';

import { getOAuthByPlatform, updateOAuthConfig } from '@/services/admin/system';
import { useQuery } from '@tanstack/react-query';
import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import { Table, TableBody, TableCell, TableRow } from '@workspace/ui/components/table';
import { EnhancedInput } from '@workspace/ui/custom-components/enhanced-input';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function Page() {
  const t = useTranslations('google');

  const { data, refetch } = useQuery({
    queryKey: ['getOAuthByPlatform', 'google'],
    queryFn: async () => {
      const { data } = await getOAuthByPlatform({
        platform: 'google',
      });
      return data.data;
    },
  });

  async function updateConfig(key: keyof API.UpdateOAuthConfig, value: unknown) {
    if (data?.[key] === value) return;
    try {
      await updateOAuthConfig({
        ...data,
        [key]: value,
      } as API.UpdateOAuthConfig);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {
      toast.error(t('saveFailed'));
    }
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>{t('enable')}</Label>
            <p className='text-muted-foreground text-xs'>{t('enableDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.enabled}
              onCheckedChange={(checked) => updateConfig('enabled', checked)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('clientId')}</Label>
            <p className='text-muted-foreground text-xs'>{t('clientIdDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <EnhancedInput
              placeholder='123456789-abc123def456.apps.googleusercontent.com'
              value={data?.config?.client_id}
              onValueBlur={(value) => {
                updateConfig('config', {
                  ...data?.config,
                  client_id: value,
                });
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='align-top'>
            <Label>{t('clientSecret')}</Label>
            <p className='text-muted-foreground text-xs'>{t('clientSecretDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <EnhancedInput
              placeholder='GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
              value={data?.config?.client_secret}
              onValueBlur={(value) => {
                updateConfig('config', {
                  ...data?.config,
                  client_secret: value,
                });
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('redirectUri')}</Label>
            <p className='text-muted-foreground text-xs'>{t('redirectUriDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <EnhancedInput
              placeholder='https://your-domain.com/v1/auth/oauth/callback/google'
              value={data?.redirect}
              onValueBlur={(value) => updateConfig('redirect', value)}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
