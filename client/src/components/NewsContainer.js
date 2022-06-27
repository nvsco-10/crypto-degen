import { HeadingWIcon, News } from '.'
import { useAppContext } from '../context/appContext';

import { FaBitcoin } from 'react-icons/fa'

import { 
  VStack, 
  StackDivider, 
  Text 
} from '@chakra-ui/react';

const NewsContainer = () => {
  const { rCryptoData } = useAppContext()

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      align='stretch'
      maxWidth={{xs: '500', md: '450', lg: '600' }}
    >
      <HeadingWIcon
        text='Hottest in r/CryptoCurrency'
        icon={<FaBitcoin style={{color: 'orange'}} />}
        url='https://www.reddit.com/r/CryptoCurrency/'
      />
     {rCryptoData?.length > 0 ? (
      rCryptoData?.map(post => {
        return (
          <News
            key={post.data.id}
            title={post.data.title}
            snippet={post.data.selftext}
            comments={post.data.num_comments}
            upvotes={post.data.ups}
            url={post.data.url}
          />
        )
      })
     ) : (
      <Text>API limit exceeded...</Text>
     )}
    </VStack>
  )
}

export default NewsContainer