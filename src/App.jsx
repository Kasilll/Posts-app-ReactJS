import React from 'react'
import Posts from './component/Posts'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	justify-content: center;
`

const Wrapper = styled.div`
	max-width: 1200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-top: 2rem;
`

function App() {
	const [ data, setData ] = React.useState([]) // здесь будут храниться оба массива
	const [ loading, setLoading ] = React.useState(null)

	React.useEffect(() => {
		setLoading(true)
		Promise.all([
			fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()),
			fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json())
		]).then(([ posts, users ]) => {
			setLoading(false)
			const res = posts.map((i) => ({
				...i,
				user: users.find((user) => i.userId === user.id)
			}))
			setData(res)
		})
	}, [])
	
	return (
		<Container>
			<Wrapper>
				{loading && <div>Loading...</div>}
				{data[0] && <Posts data={data} />}  
				{!data[0] && !loading && <div>Постов нет </div>}
			</Wrapper>
		</Container>
	)
}

export default App
