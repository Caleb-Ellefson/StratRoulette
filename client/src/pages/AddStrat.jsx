
import styled from 'styled-components'
import { FormRow, FormRowSelect, Alert, NavBar } from '../components/Index'
import { useAppContext } from '../context/appContext'

const AddStrat = () => {

    const {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        stratName,
        stratDescription,
        Team,
        teamTypeOptions,
        // status,
        // statusOptions,
        handleChange,
        clearValues,
        createJob,
        editJob,
      } = useAppContext()
    
      const handleSubmit = (e) => {
        e.preventDefault()
    
        if (!stratName || !stratDescription || !Team) {
          displayAlert()
          return
        }
        if (isEditing) {
          editJob()
          return
        }
        createJob()
      }
      const handleStratInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
      }

  return (
    <Wrapper>
        <NavBar />
        <div className='container'>
            <form className='form'>
                <h3>Create a Strat</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    {/* position */}
                    <FormRow
                    type='text'
                    name='stratName'
                    value={stratName}
                    handleChange={handleStratInput}
                    />
                    {/* company */}
                    {/* job status */}
                    {/* ADMIN ONLY */}
                    {/* <FormRowSelect
                    name='status'
                    value={status}
                    handleChange={handleStratInput}
                    list={statusOptions}
                    /> */}
                    {/* job type */}
                    <FormRowSelect
                    name='Team'
                    labelText='Team'
                    value={Team}
                    handleChange={handleStratInput}
                    list={teamTypeOptions}
                    />
                    <div className='form-row'>
                        <label className='form-label'>
                        Strat
                        </label>
                        <textarea
                            type='text'
                            name='stratDescription'
                            value={stratDescription}
                            className='stratBox'
                            onChange={handleStratInput}
                        />
                    </div>
                    {/* btn container */}
                    <div className='btn-container'>
                    <button
                        type='submit'
                        className='btn btn-block submit-btn'
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        submit
                    </button>
                    <button
                        className='btn btn-block clear-btn'
                        onClick={(e) => {
                        e.preventDefault()
                        clearValues()
                        }}
                    >
                        clear
                    </button>
                    </div>
                </div>
            </form>
        </div>
        
    </Wrapper>
  )
}

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100vw;
  height: 100vh;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  background: linear-gradient(#3c4c5a, #0a1924);
  font-weight: 700;



  h3 {
    margin-top: 0;
    font-family: var(--main-font);
    font-size: 60px;
  }

  .stratBox{
    height:90px;
    width: 100%;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    padding: 5px;
    font-size: 15px;
    font-weight: 800;
    resize: none;
  }

  .form {
    margin: 0;
    border-radius: 10;
    box-shadow: none;
    padding: 2rem;
    max-width: 100%;
    width: 100%;
    margin-top: 50px;
    border-bottom: 5px solid var(--primary-500);
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;

    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
      margin-bottom: 5px;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
        grid-template-columns: 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default AddStrat