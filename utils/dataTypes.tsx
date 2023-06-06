export type courseDataType = {
    title: string;
    description: string;
    price: number;
    _id: string;
    categoryId: string;
}

export type categoryDataType = {
    title: string;
    description: string;
    _id: string;
}

export type categoryResType = {
    message: string,
    categories: Array<categoryDataType>
}

export type courseResType = {
    message: string,
    courses: Array<courseDataType>
}

export const defaultCategoryRes = {
    message: '',
    categories: []
}
