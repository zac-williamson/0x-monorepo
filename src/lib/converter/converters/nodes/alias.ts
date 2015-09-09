import * as ts from "typescript";

import {Reflection, ReflectionKind} from "../../../models/Reflection";
import {Context} from "../../Context";
import {NodeConveter} from "../node";

import {convertType} from "../type";
import {createDeclaration} from "../factories/declaration";
 

export class AliasConverter implements NodeConveter<ts.TypeAliasDeclaration>
{
    /**
     * List of supported TypeScript syntax kinds.
     */
    supports:ts.SyntaxKind[] = [
        ts.SyntaxKind.TypeAliasDeclaration
    ];


    /**
     * Analyze the given type alias declaration node and create a suitable reflection.
     *
     * @param context  The context object describing the current state the converter is in.
     * @param node     The type alias declaration node that should be analyzed.
     * @return The resulting reflection or NULL.
     */
    convert(context:Context, node:ts.TypeAliasDeclaration):Reflection {
        var alias = createDeclaration(context, node, ReflectionKind.TypeAlias);

        context.withScope(alias, () => {
            alias.type = convertType(context, node.type, context.getTypeAtLocation(node.type));
        });

        return alias;
    }
}
