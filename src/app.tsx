import React from 'react';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { getIntl, getLocale, history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { ResponseError } from 'umi-request';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';

import { createClient, Provider, dedupExchange, cacheExchange, makeOperation } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';

import appConfig from './appConfig.json';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** When obtaining user information is slow, a loading will be displayed */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const userId = localStorage.getItem('id');

      if (userId == null) {
        return undefined;
      } else {
        let currentUser: API.CurrentUser = { userid: userId };
        return currentUser;
      }
    } catch (error) {
      console.info('Current User is undefined :', error);
      history.push(loginPath);
    }
    return undefined;
  };

  // If it is a login page, do not execute
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

/**
 * Exception handler
 const codeMessage = {
  200: 'The Server successfully retrieved the requested data.', // OK
  201: 'Successfully created new data.', // Created
  202: 'A request has been received.', // Accepted
  204: 'The data was deleted successfully.', // No Content
  400: 'An error occured in the sent request，the server did not create or modify data.', // Bad Request
  401: 'The user does not have permission（token, username, and password are wrong）.', // Unauthorized
  403: 'The user is authorized，but access is forbidden.', // Forbidden
  404: 'The sent request was for a record that did not exist，hence the server did not operate.', // Not Found
  405: 'The request method is not allowed.', // Method not Allowed
  406: 'The request format is not available.', // Not Acceptable
  410: 'The requested source is permanently deleted and will nolonger be available.', // Gone
  422: 'A validation error occured when creating an object.', // Unprocessable Entity
  500: 'An error occured in the server, please check the server', // Internal Server Error
  502: 'Gateway error.', // Bad Gateway
  503: 'The service is unavailable.', // Service Unavailable
  504: 'The gateway timed out', // Gateway Timeout
 };
 * @see https://beta-pro.ant.design/docs/request-cn
 */

export const request: RequestConfig = {
  errorHandler: (error: ResponseError) => {
    const { messages } = getIntl(getLocale());
    const { response } = error;

    if (response && response.status) {
      const { status, statusText, url } = response;
      const requestErrorMessage = messages['app.request.error'];
      const errorMessage = `${requestErrorMessage} ${status}: ${url}`;
      const errorDescription = messages[`app.request.${status}`] || statusText;
      notification.error({
        message: errorMessage,
        description: errorDescription,
      });
    }

    if (!response) {
      notification.error({
        description: 'Cannot connect to the server, please check your network',
        message: 'Network Error',
      });
    }
    throw error;
  },
};

// ProLayout supported api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;

      // If not logged in, one is redirect to login screen
      if (!initialState?.currentUser?.name && location.pathname !== loginPath) {
        console.debug('You are not logged in, redirecting to login screen...');
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>openAPI docs</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>Business comp. docs</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // Custom page on HTTP status 403 (forbidden)
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

// Setting up the Client
const urqlClient = createClient({
  url: appConfig.graphqlUri,
  exchanges: [
    dedupExchange, 
    cacheExchange, 
    authExchange<{strapiToken: string}>({
      addAuthToOperation: ({authState, operation}) => {
        if (!authState) {
          return operation;
        }

        // fetchOptions can be a function (See Client API) but you can simplify this based on usage.
        const fetchOptions = 
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authState.strapiToken}`
            },
          },
        });
      },

      /**
       * An optional parameter and is run before a network request is made.
       * For example, we can use this to predict that the authentication will fail because our JWT is invalid already.
       */
      willAuthError: ({ authState }) => {
        if (!authState) return true;
        
        /** Code for checking token expiration, existance of auth **/

        return false;
      },

      // Check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
      getAuth: async ({ authState }) => {
        // Put logic for refreshToken if available, but Strapi currently does not support a refreshToken.
      }
    }), 
    multipartFetchExchange
  ],
});

// Providing the Client
export function rootContainer(container: React.Component) {
  return <Provider value={urqlClient}>{container}</Provider>;
}
