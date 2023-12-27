import { twMerge } from 'tailwind-merge'

export type ListOfErrors = Array<string | null | undefined> | null | undefined

export function ErrorList({
	id,
	errors,
	className,
}: {
	className?: string
	errors?: ListOfErrors
	id?: string
}) {
	const errorsToRender = errors?.filter(Boolean)
	if (!errorsToRender?.length) return null
	return (
		<ul id={id} className="flex flex-col gap-1">
			{errorsToRender.map(e => (
				<li key={e} className={twMerge('text-sm font-medium text-red')}>
					{e}
				</li>
			))}
		</ul>
	)
}


