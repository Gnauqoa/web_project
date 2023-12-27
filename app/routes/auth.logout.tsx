import { redirect, type DataFunctionArgs } from '@remix-run/node'
import { PATH_PAGE } from '~/config/path'
import { authenticator } from '~/utils/auth.server'


export async function action({ request }: DataFunctionArgs) {
	await authenticator.logout(request, { redirectTo: PATH_PAGE.login })
}

export async function loader() {
	return redirect(PATH_PAGE.login)
}
