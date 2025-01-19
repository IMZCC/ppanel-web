'use client';

import { getOAuthConfig, oAuthCreateConfig, updateOAuthConfig } from '@/services/admin/system';
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
    queryKey: ['getOAuthConfig', 'google'],
    queryFn: async () => {
      const { data } = await getOAuthConfig();
      return data.data?.list.find((item) => item.platform === 'google') as API.OAuthConfig;
    },
  });

  async function updateConfig(key: keyof API.OAuthConfig, value: unknown) {
    if (data?.[key] === value) return;
    try {
      if (data?.id) {
        await oAuthCreateConfig({
          ...data,
          platform: 'google',
          [key]: value,
        } as API.OAuthConfig);
      } else {
        await updateOAuthConfig({
          ...data,
          [key]: value,
        } as API.OAuthConfig);
      }
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
              value={data?.client_id}
              onValueBlur={(value) => updateConfig('client_id', value)}
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
              value={data?.client_secret}
              onValueBlur={(value) => updateConfig('client_secret', value)}
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
