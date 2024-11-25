import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { Search, Plus, ArrowClockwise, ArrowLeftShort } from "react-bootstrap-icons";
import ThemedSpinner from "../../components/spinners/ThemedSpinner";
import useRecipes from "../../hooks/UseRecipes";
import useModal from "../../hooks/UseModal";
import ViewRecipeModal from "../../components/modals/ViewRecipeModal";
import CreateRecipeModal from "../../components/modals/CreateRecipeModal";
import AddRecipeToListModal from "../../components/modals/AddRecipeToListModal";

export default function Recipes() {
  const {
    loading,
    error,
    recipes,
    recipeDetails,
    searchResults,
    getRecipeById,
    deleteRecipe,
    searchRecipe,
    saveRecipe,
    loadRecipes,
  } = useRecipes();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const noRecipes = recipes.length === 0;

  const viewModal = useModal();
  const createModal = useModal();
  const groceryModal = useModal();

  // State to track which container is shown (0 or 1)
  const [currentContainer, setCurrentContainer] = useState(0);
  const handleNext = () => setCurrentContainer(1); // Switch to the second container
  const handlePrevious = () => setCurrentContainer(0); // Switch to the first container

  // state for form inputs
  const [prompt, setPrompt] = useState("");
  const [usePantry, setUsePantry] = useState(false);
  const [considerDiet, setConsiderDiet] = useState(true);
  const [considerAllergies, setConsiderAllergies] = useState(true);
  const [rangeValue, setRangeValue] = useState(1);

  const resetForm = () => {
    setPrompt("");
    setUsePantry(false);
    setConsiderDiet(true);
    setConsiderAllergies(true);
    setRangeValue(1);
    setValue("prompt", "");
  };

  const handleRangeChange = (e) => setRangeValue(Number(e.target.value)); // Update state with the new value
  const handlePromptChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    setValue("prompt", value);
  };

  const [searchLoading, setSearchLoading] = useState(true);

  const handleSearch = async () => {
    setSaveError(null);
    setSearchLoading(true);
    handleNext();
    await searchRecipe(prompt, usePantry, considerDiet, considerAllergies, rangeValue);
    setSearchLoading(false);
  };

  const [saveError, setSaveError] = useState(null);

  const handleSaveRecipe = async () => {
    setSaveError(null);
    try {
      await saveRecipe();
      await loadRecipes();
    } catch (e) {
      setSaveError(e);
    }
  };

  const handleSaveAndAdd = async () => {
    setSaveError(null);
    try {
      await saveRecipe();
      await loadRecipes();
      groceryModal.showModal({});
    } catch (e) {
      setSaveError(e);
    }
  };

  const [groceryLists, setGroceryLists] = useState({});

  return (
    <Container>
      <Row>
        <Col md={8} className="border-end">
          {currentContainer === 0 && (
            <>
              <div className="d-flex justify-content-between">
                <h2>
                  AI Recipe Search <Search size={24} />
                </h2>
                <Button variant="primary" onClick={resetForm}>
                  Reset Fields <ArrowClockwise size={24} />
                </Button>
              </div>
              <hr style={{ margin: "20px 0" }} />

              {/* Form with validation */}
              <Form onSubmit={handleSubmit(handleSearch)}>
                <Form.Group className="mb-3" controlId="promptField">
                  <Form.Label>What kind of Recipe can I help you find?</Form.Label>
                  <Controller
                    name="prompt"
                    control={control}
                    rules={{ required: "Prompt is required" }} // Make prompt required
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        as="textarea"
                        style={{ resize: "none" }}
                        rows={3}
                        value={prompt}
                        onChange={handlePromptChange}
                      />
                    )}
                  />
                  {errors.prompt && (
                    <p className="text-danger">{errors.prompt.message}</p>
                  )}{" "}
                  {/* Error message */}
                </Form.Group>

                {/* Other form fields */}
                <Row>
                  <Col className="d-flex flex-column">
                    <p>Use...</p>
                    <Form.Check
                      type="radio"
                      name="group1"
                      id="any-switch"
                      label="Any Items"
                      checked={!usePantry}
                      onChange={() => setUsePantry(false)}
                    />
                    <Form.Check
                      type="radio"
                      name="group1"
                      id="pantry-switch"
                      label="Only Pantry Items"
                      checked={usePantry}
                      onChange={() => setUsePantry(true)}
                    />
                  </Col>
                  <Col className="d-flex flex-column">
                    <p>Profile Options</p>
                    <Form.Check
                      id="diet-switch"
                      label="Consider Dietary Preferences"
                      checked={considerDiet}
                      onChange={(e) => setConsiderDiet(e.target.checked)}
                    />
                    <Form.Check
                      id="allergy-switch"
                      label="Consider Allergies"
                      checked={considerAllergies}
                      onChange={(e) => setConsiderAllergies(e.target.checked)}
                    />
                  </Col>
                  <Col className="d-flex flex-column">
                    <p>What's your budget?</p>
                    <Form.Range
                      min={0}
                      max={2}
                      step={1}
                      value={rangeValue}
                      onChange={handleRangeChange}
                    />
                    <div className="d-flex justify-content-between mt-2">
                      <span>$&nbsp;&nbsp;</span>
                      <span>&nbsp;$$</span>
                      <span>$$$</span>
                    </div>
                  </Col>
                </Row>

                <div className="d-flex justify-content-center">
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </div>
              </Form>
            </>
          )}

          {currentContainer === 1 && (
            <>
              <div className="d-flex justify-content-between">
                <h2>
                  AI Recipe Search <Search size={24} />
                </h2>
                <Button variant="primary" onClick={handlePrevious}>
                  <ArrowLeftShort size={24} /> Back to Search
                </Button>
              </div>
              <hr style={{ margin: "20px 0" }} />

              {searchLoading ? (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "50vh" }}
                >
                  <ThemedSpinner variant="primary" />
                </div>
              ) : Object.keys(searchResults).length > 0 && searchResults.error ? (
                <p className="text-danger">Something went wrong! {searchResults.error}</p>
              ) : Object.keys(searchResults).length > 0 ? (
                <div>
                  <h3>{searchResults.name}</h3>
                  <hr style={{ margin: "20px 0" }} />
                  <p>
                    <strong>Description/Instructions:</strong>
                  </p>
                  <p>{searchResults.description}</p>
                  <p>
                    <strong>Estimated Time:</strong> {searchResults.estimatedTime} minutes
                  </p>

                  <h4>Ingredients:</h4>
                  <ul>
                    {searchResults.ingredients.map((item, index) => (
                      <li key={index}>
                        {item.quantity} {item.unit} of {item.name}
                      </li>
                    ))}
                  </ul>
                  <hr style={{ margin: "20px 0" }} />
                  <div className="d-flex gap-2">
                    <Button variant="primary" onClick={handleSaveRecipe}>
                      Save Recipe
                    </Button>
                    <Button variant="primary" onClick={handleSaveAndAdd}>
                      Save & Add Items to List
                    </Button>
                  </div>
                  {saveError && <p className="text-danger">Failed to save recipe</p>}
                </div>
              ) : (
                <p>No results found</p>
              )}
            </>
          )}
        </Col>

        <Col md={4}>
          <div className="d-flex justify-content-between">
            <h2>Saved Recipes</h2>
            <Button
              variant="primary"
              onClick={() => {
                createModal.showModal({});
              }}
            >
              <Plus size={24} />
            </Button>
          </div>
          <hr style={{ margin: "20px 0" }} />
          <div className="d-grid gap-2">
            {loading ? (
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "50vh" }}
              >
                <ThemedSpinner variant="primary" />
              </div>
            ) : error ? (
              <p>"Something went wrong! " {error}</p>
            ) : noRecipes ? (
              <p>No Recipes Found</p>
            ) : (
              recipes.map((recipe) => (
                <Button
                  onClick={() => {
                    viewModal.showModal({ data: recipe.id, onSubmit: handlePrevious });
                  }}
                  variant="primary"
                  size="lg"
                  key={recipe._id}
                >
                  {recipe.name}
                </Button>
              ))
            )}
          </div>
        </Col>
      </Row>
      <ViewRecipeModal
        modal={viewModal}
        recipeDetails={recipeDetails}
        getRecipeById={getRecipeById}
        deleteRecipe={deleteRecipe}
      />
      <CreateRecipeModal modal={createModal} />
      <AddRecipeToListModal modal={groceryModal} />
    </Container>
  );
}
