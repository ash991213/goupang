import { Res } from '@libs/util/res/res.interface';

// * common
export const SUCCESS: Res = { code: 0, message: '성공' };
export const INVALID_PARAM: Res = { code: 1, message: '잘못된 파라미터 입니다.' };
export const INTERNAL_SERVER_ERROR: Res = { code: 2, message: '내부 서버 오류가 발생했습니다.' };
export const WRONG_APPROACH: Res = { code: 3, message: '요청 경로를 찾을 수 없습니다.' };
export const NOT_HAVE_ACCESS: Res = { code: 4, message: '접근 권한이 없습니다.' };
export const BAD_GATEWAY: Res = { code: 5, message: '요청 리소스에 연결할 수 없습니다.' };
export const GATEWAY_TIMEOUT: Res = { code: 6, message: '요청 시간이 초과 되었습니다.' };
export const UNAUTHORIZED_ERROR: Res = { code: 7, message: '인증되지 않은 요청입니다.' };
export const USER_HEADER_NOT_FOUND: Res = { code: 8, message: '회원 헤더를 찾을 수 없습니다.' };
export const INVALID_HEADER_USER_ID: Res = { code: 9, message: '회원 헤더의 유저 ID가 유효하지 않습니다.' };

// * database
export const DB_CONNECTION_FAILED: Res = { code: 1001, message: '데이터베이스에 연결을 실패하였습니다.' };
export const DB_SELECT_FAILED: Res = { code: 1002, message: '데이터베이스에 데이터를 불러오는데 실패했습니다.' };
export const DB_INSERT_FAILED: Res = { code: 1003, message: '데이터베이스에 데이터를 생성하는데 실패했습니다.' };
export const DB_UPDATE_FAILED: Res = { code: 1004, message: '데이터베이스에 데이터를 변경하는데 실패했습니다.' };
export const DB_DELETE_FAILED: Res = { code: 1005, message: '데이터베이스에 데이터를 제거하는데 실패했습니다.' };

// * redis
export const REDIS_CONNECTION_FAILED: Res = { code: 2001, message: '캐시 서버에 연결을 실패했습니다.' };
export const DB_GET_FAILED: Res = { code: 2002, message: '캐시 서버에 데이터를 불러오는데 실패했습니다.' };
export const REDIS_SET_FAILED: Res = { code: 2003, message: '캐시 서버에 데이터를 저장하는데 실패했습니다.' };
export const REDIS_DELETE_FAILED: Res = { code: 2004, message: '캐시 서버에 데이터를 삭제하는데 실패했습니다.' };
export const REDIS_SET_EXPIRED_FAILED: Res = { code: 2005, message: '캐시 서버에 데이터의 만료 기간을 설정하는데 실패했습니다.' };

// * auth
export const AUTH_LOGIN_FAILED: Res = { code: 3001, message: '로그인을 하는데 실패했습니다.' };
export const AUTH_LOGOUT_FAILED: Res = { code: 3002, message: '로그아웃을 하는데 실패했습니다.' };
export const AUTH_USER_NOT_FOUND: Res = { code: 3003, message: '사용자를 찾을 수 없습니다.' };
export const AUTH_INVALID_ID_OR_PASSWORD: Res = { code: 3004, message: '아이디 또는 비밀번호가 일치하지 않습니다.' };
export const AUTH_ACCESS_TOKEN_CREATION_FAILED: Res = { code: 3005, message: '액세스 토큰 생성에 실패했습니다.' };
export const AUTH_REFRESH_TOKEN_CREATION_FAILED: Res = { code: 3006, message: '리프레시 토큰 생성에 실패했습니다.' };
export const AUTH_REFRESH_TOKEN_COMPARISON_FAILED: Res = { code: 3007, message: '리프레시 토큰을 비교하는 데 실패했습니다.' };
export const AUTH_REFRESH_TOKEN_HASHING_FAILED: Res = { code: 3008, message: '리프레시 토큰 해싱에 실패했습니다.' };
export const AUTH_REFRESH_TOKEN_UNDEFINED: Res = { code: 3009, message: '리프레시 토큰을 찾을 수 없습니다.' };
export const AUTH_INVALID_REFRESH_TOKEN: Res = { code: 3010, message: '잘못된 리프레시 토큰입니다.' };
export const AUTH_JWT_NOT_FOUND: Res = { code: 3011, message: 'JWT 토큰을 찾을 수 없습니다.' };
export const AUTH_JWT_INVALID: Res = { code: 3012, message: '유효하지 않은 JWT 토큰입니다.' };
export const AUTH_JWT_EXPIRED: Res = { code: 3013, message: '만료된 JWT 토큰입니다.' };

// * product
export const PRODUCT_NOT_FOUND: Res = { code: 4001, message: '상품을 찾을 수 없습니다.' };
export const PRODUCT_SELECT_FAILED: Res = { code: 4002, message: '상품 조회에 실패했습니다.' };
export const PRODUCT_SELECT_FAILED_BY_HOST_ID: Res = { code: 4003, message: '호스트 ID로 상품을 찾을 수 없습니다.' };
export const PRODUCT_CREATE_FAILED: Res = { code: 4004, message: '상품 생성에 실패했습니다.' };
