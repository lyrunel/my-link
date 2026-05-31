import type { Metadata } from "next"
import { collection, query, where, getDocs, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"

async function getProfileData(username: string) {
  try {
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      limit(1)
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return null
    }

    const docSnapshot = snapshot.docs[0]
    const data = docSnapshot.data()

    return {
      uid: docSnapshot.id,
      displayName: (data.displayName as string) || "",
      username: (data.username as string) || "",
      bio: (data.bio as string) || "",
      photoURL: (data.photoURL as string | null | undefined) || null,
      theme: (data.theme as string | undefined) || "indigo",
    }
  } catch (error) {
    console.error(
      `[Metadata Debug] Firestore fetch failed for username "${username}":`,
      error
    )
    return null
  }
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ username: string }> | { username: string }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }> | { username: string }
}): Promise<Metadata> {
  const resolvedParams = await params
  const username = resolvedParams.username

  const profile = await getProfileData(username)

  if (!profile) {
    return {
      title: "프로필을 찾을 수 없습니다",
      description: "MyLink에서 해당 프로필 페이지를 찾을 수 없습니다.",
    }
  }

  const title = `${profile.displayName} (@${profile.username})`
  const description =
    profile.bio ||
    `${profile.displayName}님의 MyLink 멀티링크 프로필 페이지입니다. SNS, 포트폴리오, 주요 링크를 만나보세요.`
  const profileUrl = `https://my-link-olive.vercel.app/${profile.username}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: profileUrl,
      type: "profile",
      username: profile.username,
      images: [
        {
          url: `/${profile.username}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${profile.displayName}님의 프로필 이미지`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/${profile.username}/opengraph-image`],
    },
  }
}

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
