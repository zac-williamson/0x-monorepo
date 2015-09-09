import * as ts from "typescript";

import {Context} from "../../Context";
import {Type} from "../../../models/Type";
import {IntrinsicType} from "../../../models/types/IntrinsicType";
import {TypeTypeConverter} from "../type";


export class IntrinsicConverter implements TypeTypeConverter<ts.IntrinsicType>
{
    /**
     * Test whether this converter can handle the given TypeScript type.
     */
    supportsType(context:Context, type:ts.IntrinsicType):boolean {
        return !!(type.flags & ts.TypeFlags.Intrinsic);
    }


    /**
     * Convert the given intrinsic type to its type reflection.
     *
     * This is a type based converter with no node based equivalent.
     *
     * ```
     * var someValue:string;
     * ```
     *
     * @param type  The intrinsic type that should be converted.
     * @returns The type reflection representing the given intrinsic type.
     */
    convertType(context:Context, type:ts.IntrinsicType):IntrinsicType {
        return new IntrinsicType(type.intrinsicName);
    }
}
