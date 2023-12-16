
export interface ApiResponse<T> {
    message: string,
    result: { page: T },
    errorsValidation: string,
    error: string
}
