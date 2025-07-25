/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { useEffect, useState } from 'react';
import { Popover, type PopoverProps } from '@superset-ui/core/components';
import type ReactAce from 'react-ace';
import { CalculatorOutlined } from '@ant-design/icons';
import { css, styled, useTheme, t } from '@superset-ui/core';

const StyledCalculatorIcon = styled(CalculatorOutlined)`
  ${({ theme }) => css`
    color: ${theme.colors.grayscale.base};
    font-size: ${theme.fontSizeSM}px;
    & svg {
      margin-left: ${theme.sizeUnit}px;
      margin-right: ${theme.sizeUnit}px;
    }
  `}
`;

export const SQLPopover = (props: PopoverProps & { sqlExpression: string }) => {
  const theme = useTheme();
  const [AceEditor, setAceEditor] = useState<typeof ReactAce | null>(null);
  useEffect(() => {
    Promise.all([
      import('react-ace'),
      import('ace-builds/src-min-noconflict/mode-sql'),
    ]).then(([reactAceModule]) => {
      setAceEditor(() => reactAceModule.default);
    });
  }, []);

  if (!AceEditor) {
    return null;
  }
  return (
    <Popover
      content={
        <AceEditor
          mode="sql"
          value={props.sqlExpression}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            highlightActiveLine: false,
            highlightGutterLine: false,
          }}
          minLines={2}
          maxLines={6}
          readOnly
          wrapEnabled
          style={{
            border: `1px solid ${theme.colorBorder}`,
            background: theme.colorPrimaryBg,
            maxWidth: theme.sizeUnit * 100,
          }}
        />
      }
      placement="bottomLeft"
      arrow={{ pointAtCenter: true }}
      title={t('SQL expression')}
      {...props}
    >
      <StyledCalculatorIcon />
    </Popover>
  );
};
