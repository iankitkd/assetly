"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm'
import ModalWrapper from '@/components/shared/ModalWrapper'
import AuthErrorAlert from '@/components/shared/ErrorAlert';
import { authErrorMap } from '@/utils/authErrors';

export default function page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  let error = searchParams.get("error");
  if(error) error = authErrorMap[error] ?? "Authentication failed. Please try again.";

  return (
    <>
      {error ? (
        <ModalWrapper>
          <AuthErrorAlert 
            error={error} 
            showRetry={true}
            onRetry={() => router.push('/login')} 
          />
        </ModalWrapper>
      ): (
        <ModalWrapper>
          <LoginForm />
        </ModalWrapper>
      )}
    </>
  )
}
