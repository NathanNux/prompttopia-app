import PromptCard from './PromptCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            // be aware of how you are passing a function, by doing just {handleEdit etc.} you are passing just the function as object, if you want to pass some other object you must pass it as arrow function with one normal function object and then the function witha actuall needed object
          />
        ))}
      </div>
    </section>
  )
}

export default Profile