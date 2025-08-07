import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return <div className='w-svw h-svh flex justify-center mt-10'>
        <SignIn />
    </div>
}