import { QueryClient } from "@tanstack/react-query"

let queryClient: QueryClient | undefined

export const useGetQueryClient = (customQueryClient?: QueryClient) => {
    if (customQueryClient) {
        queryClient = customQueryClient
        return customQueryClient
    }

    if (!queryClient) {
        queryClient = new QueryClient()
    }

    return queryClient
}