import { QueryClient } from "@tanstack/react-query"

let queryClient: QueryClient | undefined = undefined

export const useGetQueryClient = (): QueryClient => {
    if (!queryClient) {
        queryClient = new QueryClient()
    }

    return queryClient
}