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
  ProjectsSearchQuery as ResponseType,
  ProjectsSearchQueryVariables as InputType,
  ProjectsSearchQuery_projects_items as ItemType,
} from './__generated__/ProjectsSearchQuery';

type Output = {
  search: Dispatch<SetStateAction<string>>;
  results: ItemType[];
  loading: boolean;
};

const MAX_SEARCH_RESULTS = 10;

const SEARCH_PROJECTS = gql`
  query ProjectsSearchQuery($first: Int, $search: String) {
    projects(first: $first, search: $search) {
      count
      items {
        id
        name
      }
    }
  }
`;

const useProjectsSearch = (): Output => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const { data, errors } = await mainClient.query<ResponseType, InputType>({
        query: SEARCH_PROJECTS,
        variables: {
          first: MAX_SEARCH_RESULTS,
          search: searchTerm,
        },
      });

      if (errors) {
        setResults([]);
        console.log('Error: Unable to search users');
        console.log(errors);
      } else {
        console.log(data.projects);
        setResults(data.projects.items);
      }
    } catch (e) {
      setResults([]);
      console.log('Error: Unable to search users');
      console.log(e);
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

export default useProjectsSearch;
