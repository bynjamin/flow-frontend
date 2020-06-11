import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { mainClient } from 'apollo-clients';
import gql from 'graphql-tag';
import {
  UsersSearchQuery as ResponseType,
  UsersSearchQueryVariables as InputType,
  UsersSearchQuery_users_items as ItemType,
} from './__generated__/UsersSearchQuery';

type Output = {
  search: Dispatch<SetStateAction<string>>;
  results: ItemType[];
  loading: boolean;
};

const MAX_SEARCH_RESULTS = 10;

const SEARCH_USERS = gql`
  query UsersSearchQuery($first: Int, $search: String) {
    users(first: $first, search: $search) {
      count
      items {
        id
        title
        firstName
        lastName
        email
      }
    }
  }
`;

const useUsersSearch = (): Output => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const { data, errors } = await mainClient.query<ResponseType, InputType>({
        query: SEARCH_USERS,
        variables: {
          first: MAX_SEARCH_RESULTS,
          search: searchTerm,
        },
      });

      if (errors) {
        setResults([]);
        console.log('Error: Unable to search users');
      } else {
        setResults(data.users.items);
      }
    } catch (e) {
      setResults([]);
      console.log('Error: Unable to search users');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, searchTerm]);

  return {
    search: setSearchTerm,
    results,
    loading,
  };
};

export default useUsersSearch;
