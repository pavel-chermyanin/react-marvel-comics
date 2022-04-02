import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './form.scss';

const CharForm = () => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacterByName, clearError } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name).then(onCharLoaded)
    }

    const results = !char ? null : char.length > 0 ? (
        <div className="charform__search">
            <div className="charform__search-success">
                There is! Visit {char[0].name} page?
            </div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div>) : (
        <div className="charform__search-error">
            The character was not found. Check the name and try again
        </div>
    )

    return (
        <>
            <Formik
                initialValues={{ name: '' }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Введите имя персонажа')
                })}
                onSubmit={({ name }) => {
                    updateChar(name)
                }}>
                <Form className="charform">
                    <h4 className='charform__title'>
                        Or find character by name :
                    </h4>

                    <label className="charform__label">
                        <Field name="name" type="text" className="charform__input" placeholder="Enter char" />
                        <button
                            disabled={loading}
                            className="button button__main"
                            type="submit">
                            <div className="inner">find</div>
                        </button>
                    </label>
                    <FormikErrorMessage name="name" component="div" className='charform__error' />
                    {results}
                </Form>
            </Formik>
            
        </>

    )
}

export default CharForm