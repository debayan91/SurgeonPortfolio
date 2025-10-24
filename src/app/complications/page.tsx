import { PageHeader } from '@/components/page-header';
import ComplicationsMatrix from '@/components/complications-matrix';
import { getComplications } from '@/lib/data';

export default async function ComplicationsPage() {
  const complications = await getComplications();
  return (
    <div className="flex flex-col gap-8 py-8 md:py-16">
      <PageHeader
        title="Complications Matrix"
        description="Explore complication categories to find related surgical videos."
      />
      <ComplicationsMatrix complications={complications} />
    </div>
  );
}
