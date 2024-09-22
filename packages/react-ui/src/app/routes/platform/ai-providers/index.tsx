import { useMutation, useQuery } from '@tanstack/react-query';
import { t } from 'i18next';

import { Skeleton } from '@/components/ui/skeleton';
import { TableTitle } from '@/components/ui/table-title';
import { INTERNAL_ERROR_TOAST, toast } from '@/components/ui/use-toast';
import { aiProviderApi } from '@/features/platform-admin-panel/lib/ai-provider-api';
import { AI_PROVIDERS } from '@activepieces/pieces-common';

import { AIProviderCard } from './ai-provider-card';

export default function AIProvidersPage() {
  const {
    data: providers,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['ai-providers'],
    queryFn: () => aiProviderApi.list(),
  });

  const { mutate: deleteProvider, isPending: isDeleting } = useMutation({
    mutationFn: (provider: string) => aiProviderApi.delete(provider),
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      toast(INTERNAL_ERROR_TOAST);
    },
  });

  return (
    <div className="flex flex-col w-full">
      <div className="mb-4 flex">
        <div className="flex justify-between flex-row w-full">
          <div className="flex flex-col gap-2">
            <TableTitle>{t('AI Providers')}</TableTitle>
            <div className="text-md text-muted-foreground">
              {t('Add your api keys that will be used by our Text AI piece.')}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {AI_PROVIDERS.map((metadata) => {
          const provider = providers?.data.find(
            (c) => c.provider === metadata.value,
          );
          return isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <AIProviderCard
              providerMetadata={metadata}
              defaultBaseUrl={provider?.baseUrl ?? metadata.defaultBaseUrl}
              provider={
                provider
                  ? { ...provider, config: { defaultHeaders: {} } }
                  : undefined
              }
              isDeleting={isDeleting}
              onDelete={() => deleteProvider(metadata.value)}
              onSave={() => refetch()}
            />
          );
        })}
      </div>
    </div>
  );
}
