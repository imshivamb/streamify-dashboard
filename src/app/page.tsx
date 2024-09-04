import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-200 via-orange-400 to-amber-600 text-white p-4">
      <main className="text-center">
        <div className="mb-8">
          <Image
            src="/streamify.svg"
            alt="Streamify Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4">Welcome to Streamify</h1>
        <p className="text-xl mb-8 max-w-md mx-auto">
          Your ultimate music streaming platform. Discover, listen, and share
          your favorite tracks with friends around the world.
        </p>
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-600 hover:text-white transition duration-300"
          >
            Get Started
          </Link>
          <Link
            href="/register"
            className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition duration-300"
          >
            Register
          </Link>
        </div>
      </main>
      <footer className="mt-16 text-sm opacity-75">
        © 2024 Streamify. All rights reserved.
      </footer>
    </div>
  );
}
