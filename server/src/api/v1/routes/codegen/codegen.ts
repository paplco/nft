import { serverErrorResponse, successResponse } from '../../lib/response';
import { generateCode } from '../../lib/utils';
import { UseApiRequestFunction } from '../../types/global';

const routeHandler: UseApiRequestFunction = async (request, params) => {
	try {
		const statements = successResponse(generateInsertStatements());
		// console.log(`statements`, statements);
		return statements;
	} catch (error: any) {
		return serverErrorResponse(`Codegen failed: ${error.message}`);
	}
};

export default routeHandler;

const generateInsertStatements = (numCodes = 100) => {
	let insertStatements = '';
	for (let i = 0; i < numCodes; i++) {
		const code = generateCode();
		insertStatements += `INSERT INTO airdrops (code, chain_id ) VALUES ('${code}','0x66eed');\n`;
	}
	return insertStatements;
};
