"use client"

import { useState } from "react"
import { LinkItem } from "@/data/links"
import { useProfileLinks } from "@/hooks/useProfileLinks"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiLoader4Line,
  RiEyeLine,
} from "@remixicon/react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const linkSchema = z.object({
  title: z.string().min(1, "링크 제목을 입력해주세요."),
  url: z
    .string()
    .min(1, "URL을 입력해주세요.")
    .superRefine((val, ctx) => {
      const finalUrl = val.startsWith("http") ? val : `https://${val}`
      try {
        const parsedUrl = new URL(finalUrl)
        if (
          !parsedUrl.hostname.includes(".") ||
          parsedUrl.hostname.length < 3
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "유효한 웹사이트 주소가 아닙니다. (예: example.com)",
          })
        }
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "올바른 URL 형식을 입력해주세요.",
        })
      }
    }),
})

type LinkFormValues = z.infer<typeof linkSchema>

function LinkItemCard({
  link,
  uid,
  onUpdate,
  onDelete,
}: {
  link: LinkItem
  uid: string
  onUpdate: (id: string, updatedData: Partial<LinkItem>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
    },
  })

  const onSubmit = async (data: LinkFormValues) => {
    if (data.title === link.title && data.url === link.url) {
      setIsEditing(false)
      return
    }
    setIsSubmitting(true)
    try {
      const finalUrl = data.url.startsWith("http")
        ? data.url
        : `https://${data.url}`
      let domain = data.url
      try {
        const parsedUrl = new URL(finalUrl)
        domain = parsedUrl.hostname
      } catch {
        // ignore
      }

      const updatedData = {
        title: data.title.trim(),
        url: finalUrl,
        icon: `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=256`,
      }

      await onUpdate(link.id, updatedData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating link: ", error)
      alert("링크 수정 중 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(link.id)
    } catch (error) {
      console.error("Error deleting link: ", error)
      alert("링크 삭제 중 오류가 발생했습니다.")
      setIsDeleting(false)
    }
  }

  if (isEditing) {
    return (
      <Card className="relative overflow-visible rounded-2xl border-2 border-indigo-500/50 bg-white/60 shadow-lg backdrop-blur-xl transition-all dark:bg-neutral-900/60">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-3 p-4 sm:p-5"
        >
          <div className="space-y-1">
            <Label className="mb-1 block text-xs font-semibold text-neutral-500">
              링크 제목
            </Label>
            <Input
              autoFocus
              placeholder="예: 내 포트폴리오"
              {...form.register("title")}
              className="h-11 bg-white/80 transition-shadow focus-visible:ring-indigo-500 dark:bg-black/40"
            />
            {form.formState.errors.title && (
              <p className="pl-1 text-xs font-medium text-red-500 dark:text-red-400">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label className="mb-1 block text-xs font-semibold text-neutral-500">
              URL 입력
            </Label>
            <Input
              placeholder="예: https://myportfolio.com"
              {...form.register("url")}
              className="h-11 bg-white/80 transition-shadow focus-visible:ring-indigo-500 dark:bg-black/40"
            />
            {form.formState.errors.url && (
              <p className="pl-1 text-xs font-medium text-red-500 dark:text-red-400">
                {form.formState.errors.url.message}
              </p>
            )}
          </div>
          <div className="mt-1 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset()
                setIsEditing(false)
              }}
              className="h-9 rounded-xl px-4 text-xs font-semibold"
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="h-9 rounded-xl bg-indigo-600 px-4 text-xs font-semibold text-white hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <RiLoader4Line className="mr-1 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                "확인"
              )}
            </Button>
          </div>
        </form>
      </Card>
    )
  }

  return (
    <div className="group relative block w-full">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50"
      >
        <Card className="relative overflow-hidden rounded-2xl border border-b-2 border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-b-indigo-500/50 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] dark:hover:border-b-indigo-400/50 dark:hover:shadow-[0_8px_40px_rgb(0,0,0,0.3)]">
          <div className="absolute inset-0 -translate-x-[100%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%] dark:via-white/5" />

          <CardContent className="relative flex min-h-[68px] items-center px-6 py-3 sm:px-8 sm:py-4">
            {link.icon && (
              <div className="absolute top-1/2 left-5 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center transition-transform duration-500 sm:left-6 sm:h-10 sm:w-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={link.icon}
                  alt={link.title}
                  className="h-full w-full rounded-md object-contain"
                />
              </div>
            )}

            <div className="z-10 flex w-full flex-col items-center justify-center px-14 sm:px-16">
              <span className="text-[15px] font-semibold text-neutral-700 transition-colors duration-300 sm:text-base dark:text-neutral-200">
                {link.title}
              </span>
            </div>
          </CardContent>
        </Card>
      </a>

      {/* 우측 조작 버튼 영역: hover 없이 항상 표시, z-index를 올려서 a 태그 클릭 방해 회피 */}
      <div className="absolute top-1/2 right-3 z-20 flex -translate-y-1/2 items-center gap-1 transition-all duration-300 ease-out group-hover:-translate-y-[calc(50%+0.25rem)]">
        <div className="pointer-events-none mr-1 flex items-center gap-1 rounded-full border border-neutral-200 bg-white/80 px-2 py-1 text-[11px] font-semibold text-neutral-500 shadow-sm backdrop-blur-md sm:mr-2 sm:text-xs dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-400">
          <RiEyeLine className="h-3.5 w-3.5" />
          {link.clickCount || 0}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // 수정 시 현재 값으로 초기화 (다른 곳에서 편집하다가 왔을 수 있으므로)
            form.reset({ title: link.title, url: link.url })
            setIsEditing(true)
          }}
          className="h-9 w-9 rounded-full text-neutral-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400"
          aria-label="링크 수정"
        >
          <RiEditLine className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="h-9 w-9 rounded-full text-neutral-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                aria-label="링크 삭제"
              >
                <RiDeleteBinLine className="h-4 w-4" />
              </Button>
            }
          />
          <AlertDialogContent className="rounded-2xl sm:max-w-[400px]">
            <AlertDialogHeader>
              <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-base font-medium text-neutral-900 dark:text-neutral-100">
                [{link.title}] 링크
              </AlertDialogDescription>
              <AlertDialogDescription className="mt-1 font-medium text-red-500 dark:text-red-400">
                이 작업은 되돌릴 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 gap-2">
              <AlertDialogCancel
                disabled={isDeleting}
                className="h-11 w-full rounded-xl sm:w-auto"
              >
                취소
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault() // Don't allow it to self-close by typical action means, wait until onDeleteSuccess
                  handleDelete()
                }}
                disabled={isDeleting}
                className="h-11 w-full rounded-xl bg-red-600 text-white hover:bg-red-700 sm:w-auto"
              >
                {isDeleting ? (
                  <>
                    <RiLoader4Line className="mr-1 h-4 w-4 animate-spin" />
                    삭제 중...
                  </>
                ) : (
                  "삭제"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export function ProfileLinks({ uid }: { uid: string }) {
  const { links, isLoading, addLink, updateLink, deleteLink } =
    useProfileLinks(uid)
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  })

  const onSubmit = async (data: LinkFormValues) => {
    setIsSubmitting(true)
    try {
      const finalUrl = data.url.startsWith("http")
        ? data.url
        : `https://${data.url}`
      let domain = data.url
      try {
        const parsedUrl = new URL(finalUrl)
        domain = parsedUrl.hostname
      } catch {
        // ignore
      }

      const newLinkData = {
        title: data.title.trim(),
        url: finalUrl,
        icon: `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=256`,
        order_index: links.length,
        is_active: true,
        clickCount: 0,
      }

      await addLink(newLinkData)

      setOpen(false)
      form.reset()
    } catch (error) {
      console.error("Error adding link: ", error)
      alert("링크 추가 중 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Add Link Button */}
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (!isOpen) {
            form.reset()
          }
        }}
      >
        <DialogTrigger
          render={
            <Button className="group h-14 w-full rounded-2xl border-none bg-indigo-600 text-base font-semibold text-white shadow-[0_8px_30px_rgb(79,70,229,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_40px_rgb(79,70,229,0.4)] dark:bg-indigo-600 dark:hover:bg-indigo-500">
              <RiAddLine className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              새 링크 추가
            </Button>
          }
        />
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              새 링크 추가
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <div className="space-y-2">
              <Label htmlFor="title">링크 제목</Label>
              <Input
                id="title"
                type="text"
                placeholder="예: 내 포트폴리오"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="text"
                placeholder="예: https://myportfolio.com"
                {...form.register("url")}
              />
              {form.formState.errors.url && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {form.formState.errors.url.message}
                </p>
              )}
            </div>
            <DialogFooter className="flex !justify-between gap-2 pt-4 sm:!justify-end">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full rounded-xl sm:w-auto"
                    disabled={isSubmitting}
                  >
                    취소
                  </Button>
                }
              />
              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <RiLoader4Line className="mr-1 h-4 w-4 animate-spin" />
                    추가 중...
                  </>
                ) : (
                  "추가하기"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Links List */}
      <div className="mt-2 flex flex-col gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <RiLoader4Line className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
        ) : links.length === 0 ? (
          <div className="py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
            아직 추가된 링크가 없습니다.
          </div>
        ) : (
          links.map((link) => (
            <LinkItemCard
              key={link.id}
              link={link}
              uid={uid}
              onUpdate={async (id, data) =>
                await updateLink({ id, updatedData: data })
              }
              onDelete={async (id) => await deleteLink(id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
