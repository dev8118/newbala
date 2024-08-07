import { useState, useEffect } from 'react'
import UserLayout from 'src/layouts/UserLayout'
import { Box, Divider } from '@mui/material'
import FeaturedPostList from 'src/components/home/FeaturedPostList'
import Videos from 'src/components/home/Videos'
import CategoryList from 'src/components/home/CategoryList'
import ServiceList from 'src/components/home/ServiceList'
import PublishedPostList from 'src/components/home/PublishedPostList'
import AdvertisementPostList from 'src/components/home/AdvertisementPostList'
import RequestForm from 'src/components/home/RequestForm'
import Http from 'src/services/Http'

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [tabCategories, setTabCategories] = useState([])
  const [services, setServices] = useState([])
  const [publishedPosts, setPublishedPosts] = useState([])
  const [advertisementPosts, setAdvertisementPosts] = useState([])

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    console.log('here home')
    const { data } = await Http.get('/home')
    setFeaturedPosts(data.featuredPosts)
    setTabCategories(data.tabCategories)
    setServices(data.services)
    setPublishedPosts(data.publishedPosts)
    setAdvertisementPosts(data.advertisementPosts)
  }

  const videos = [
    {
      link: 'https://cdn5.cdn-telegram.org/file/dae41dce11.mp4?token=LH6BwoDs7SljzvWg-Ni40NDVQRh6t7F2CKE5SspclnIR3VyVG35e7yPgA8IIe6GZZ6LFgZTUOAhfAFpMcolc2ajVyTxvMhiMCJK4G-HHlxcKoIJi8GbZT5J5QDgGjgJX2YINblU5gTEl88WfOnG-j0PvHda_ZXaJTp2HNxxg4JnqK14nVgpLGalELriNwi_z1MTWTSFyXxeiiFYj4OUcpAcsvg0-3QYbukePjgSO6FqQrSGl9-cnTh-HriQ_KOp2hPVRoL1Z_ezPQDiAh03LMgbYdgNDyAzUj6Q5viICbj0AyhuCypKB2ANbl8s5282emiiSa4AKtjZ-LHRLl96dzA',
      title: 'متابعة اكساء حي الغدير في قضاء الموفقية'
    },
    {
      link: 'https://cdn5.cdn-telegram.org/file/dae41dce11.mp4?token=LH6BwoDs7SljzvWg-Ni40NDVQRh6t7F2CKE5SspclnIR3VyVG35e7yPgA8IIe6GZZ6LFgZTUOAhfAFpMcolc2ajVyTxvMhiMCJK4G-HHlxcKoIJi8GbZT5J5QDgGjgJX2YINblU5gTEl88WfOnG-j0PvHda_ZXaJTp2HNxxg4JnqK14nVgpLGalELriNwi_z1MTWTSFyXxeiiFYj4OUcpAcsvg0-3QYbukePjgSO6FqQrSGl9-cnTh-HriQ_KOp2hPVRoL1Z_ezPQDiAh03LMgbYdgNDyAzUj6Q5viICbj0AyhuCypKB2ANbl8s5282emiiSa4AKtjZ-LHRLl96dzA',
      title: 'متابعة اكساء حي الغدير في قضاء الموفقية'
    },
    {
      link: 'https://t.me/dev_solidity/251683/284711',
      title: 'متابعة اكساء حي الغدير في قضاء الموفقية'
    },
    {
      link: 'https://t.me/dev_solidity/251683/284711',
      title: 'متابعة اكساء حي الغدير في قضاء الموفقية'
    },
    {
      link: 'https://t.me/dev_solidity/251683/284711',
      title: 'متابعة اكساء حي الغدير في قضاء الموفقية'
    },
    {
      link: 'https://t.me/dev_solidity/251683/284711',
      title: 'متابعة اكساء حي الغدير في قضاء الموفقية'
    },
    {
      link: 'https://t.me/dev_solidity/251683/284711',
      title: 'متابعة اكساء حي الغدير في قضاء الموفقية'
    }
  ]

  return (
    <Box>
      {featuredPosts.length > 0 && <FeaturedPostList posts={featuredPosts} />}
      <Videos posts={services}/>
      <CategoryList categories={tabCategories} />
      <RequestForm />
      {/* {publishedPosts.length > 0 && <PublishedPostList posts={publishedPosts} />} */}
      {advertisementPosts.length > 0 && <AdvertisementPostList posts={advertisementPosts} />}
    </Box>
  )
}

Home.getLayout = page => <UserLayout>{page}</UserLayout>
Home.guestGuard = true

export default Home
