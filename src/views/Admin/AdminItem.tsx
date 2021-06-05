import { observer } from 'mobx-react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import { useLocation, useParams } from 'react-router-dom';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export const AdminItem: IReactComponent = observer(() => {
	let query = useQuery();
	let { test } = useParams<{test: string}>();
	
	return(
	<>
		{test}
	</>
	);
})