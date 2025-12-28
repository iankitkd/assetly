"use client";

import { Suspense } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm'
import ModalWrapper from '@/components/shared/ModalWrapper'
import ErrorAlert from '@/components/shared/ErrorAlert';
import { authErrorMap } from '@/utils/authErrors';


export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  )
}

function LoginPage() {
  const searchParams = useSearchParams();
  let error = searchParams.get("error");
  if(error) error = authErrorMap[error] ?? "Authentication failed. Please try again.";

  return (
    <>
      {error ? (
        <ModalWrapper allowClose={false}>
          <ErrorAlert 
            error={error} 
            showRetry={true}
            onRetry={() => redirect('/login')} 
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