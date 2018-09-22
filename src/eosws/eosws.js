/**
 * Generate Req ID
 *
 * @private
 * @returns {string} Req ID
 * @example
 *
 * genereateReq() // => req123
 */
export function generateReqId() {
    return "req" + Math.round(Math.random() * 1000);
}

/**
 * @example
 *
 * ws.send(unlisten("req123"));
 */
export function unlisten(req_id) {
    if (!req_id) throw new Error('req_id is required');

    return JSON.stringify({
        type: "unlisten",
        data: {
            req_id,
        },
    });
}

/**
 * Get Actions
 *
 * @param {string} account Account
 * @param {string} action_name Action Name
 * @param {string} [receiver] Receiver
 * @param {string} [req_id] Request ID
 * @returns {Object} Get Action Params
 * @example
 *
 * ws.send(get_actions("eosio.token", "transfer"));
 */
export function get_actions(account, action_name, receiver, req_id) {
    if (!req_id) req_id = generateReqId();

    return JSON.stringify({
        type: "get_actions",
        req_id,
        listen: true,
        data: {
            account,
            action_name,
            receiver: receiver || account,
        },
    });
}

/**
 * Get Table Deltas
 *
 * @param {string} code Code
 * @param {string} scope Scope
 * @param {string} table_name Table Name
 * @example
 *
 * ws.send(get_table_deltas("eosio", "eosio", "global"));
 */
export function get_table_deltas(code, scope, table_name) {
    const req_id = generateReqId();

    return JSON.stringify({
        type: "get_table_deltas",
        req_id,
        listen: true,
        data: {
            code,
            scope,
            table_name,
            json: true,
        },
    });
}
