import { QueryClient, useQueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()

const useGetQueryClient = () => {
    try {
        const client = useQueryClient()
        return client
    } catch (e) {
        return queryClient
    }
}

export default useGetQueryClient