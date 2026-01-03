import { Form } from '@/components/form';
import { FormProvider } from '@/context/form-context';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <FormProvider>
        <Form />
      </FormProvider>
    </div>
  );
}
