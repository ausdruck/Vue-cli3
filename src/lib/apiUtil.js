/*eslint-disable */
// const getApiUrl = path => location.origin==='http://localhost:2000'?`http://test.ouyeel.com${path}`:`${location.origin}${path}`;
// const getApiUrl = path => process.env.API_ROOT + path;
// const getJgUrl = path => process.env.API_ROOT_JG+ path;
const getApiUrl = path => process.env.VUE_APP_BASE_API + path;
const getJgUrl = path =>process.env.VUE_APP_BASE_JgUrl+path;
export { getApiUrl,getJgUrl};
