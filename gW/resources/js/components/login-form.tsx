// LoginForm.tsx
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginFormProps = {
  canResetPassword?: boolean;
  showAlternativeLogin?: boolean;
};

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

export function LoginForm({ 
  canResetPassword = true,
  showAlternativeLogin = true
}: LoginFormProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <form className="bg-transparent flex flex-col gap-6" onSubmit={submit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            autoFocus
            tabIndex={1}
            autoComplete="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            placeholder="m@example.com"
          />
          <InputError message={errors.email} />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {canResetPassword && (
              <TextLink href={route('password.request')} className="ml-auto text-sm underline-offset-4 hover:underline" tabIndex={4}>
                Forgot your password?
              </TextLink>
            )}
          </div>
          <Input
            id="password"
            type="password"
            required
            tabIndex={2}
            autoComplete="current-password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          <InputError message={errors.password} />
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="remember"
            name="remember"
            checked={data.remember}
            onClick={() => setData('remember', !data.remember)}
            tabIndex={3}
          />
          <Label htmlFor="remember">Remember me</Label>
        </div>

        <Button type="submit" className="w-full bg-red-900" tabIndex={4} disabled={processing}>
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Login
        </Button>

      </div>
      
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <TextLink href={route('register')} className="underline underline-offset-4" tabIndex={5}>
          Sign up
        </TextLink>
      </div>
    </form>
  );
}