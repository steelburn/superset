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
import { useTheme } from '@superset-ui/core';
import { List, type ListItemProps } from '@superset-ui/core/components';

export interface CustomListItemProps extends ListItemProps {
  selectable: boolean;
}

export default function CustomListItem(props: CustomListItemProps) {
  const { selectable, children, ...rest } = props;
  const theme = useTheme();
  const css: Record<string, Record<string, Record<string, number> | string>> = {
    '&.ant-list-item': {
      ':first-of-type': {
        borderTopLeftRadius: theme.borderRadius,
        borderTopRightRadius: theme.borderRadius,
      },
      ':last-of-type': {
        borderBottomLeftRadius: theme.borderRadius,
        borderBottomRightRadius: theme.borderRadius,
      },
    },
  };

  if (selectable) {
    css['&:hover'] = {
      cursor: 'pointer',
      backgroundColor: theme.colors.grayscale.light4,
    };
  }

  return (
    <List.Item {...rest} css={css}>
      {children}
    </List.Item>
  );
}
