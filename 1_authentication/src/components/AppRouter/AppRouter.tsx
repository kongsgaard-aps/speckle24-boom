import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Loading, PageLayout } from '@components'
import { AuthPage } from '@pages'

const LoginPage = lazy(() => import('../../pages/LoginPage'))

export const AppRouter = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<PageLayout />}>
        <Route path='/' element={<LoginPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<LoginPage />} />
      </Route>
    </Routes>
  </Suspense>
)
