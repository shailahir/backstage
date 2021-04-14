/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { Content, ContentHeader, SupportButton } from '@backstage/core';
import { UnauthorizedError } from '../../api';
import Alert from '@material-ui/lab/Alert';
import { OnCallSchedulesGrid } from './OnCallSchedulesGrid';
import { MissingAuthorizationHeaderError } from '../Errors';
import { useOnCallSchedules } from '../../hooks/useOnCallSchedules';

export const OnCallSchedulesPage = () => {
  const [
    { onCallSchedules, isLoading, error },
    { refetchOnCallSchedules },
  ] = useOnCallSchedules();

  if (error) {
    if (error instanceof UnauthorizedError) {
      return <MissingAuthorizationHeaderError />;
    }

    return (
      <Alert data-testid="error-message" severity="error">
        {error.message}
      </Alert>
    );
  }

  return (
    <Content>
      <ContentHeader title="Who is on call?">
        <SupportButton>
          This helps you to bring iLert into your developer portal.
        </SupportButton>
      </ContentHeader>
      <OnCallSchedulesGrid
        onCallSchedules={onCallSchedules}
        isLoading={isLoading}
        refetchOnCallSchedules={refetchOnCallSchedules}
      />
    </Content>
  );
};
