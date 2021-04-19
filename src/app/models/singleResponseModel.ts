import { ResponseModel } from "./responseModel";

export interface SingleResponseModel<T> extends ResponseModel{
    data: T;
}

//tek bir data gelecek şekilde düzenlendi.