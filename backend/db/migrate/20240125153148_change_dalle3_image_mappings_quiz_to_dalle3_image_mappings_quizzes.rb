class ChangeDalle3ImageMappingsQuizToDalle3ImageMappingsQuizzes < ActiveRecord::Migration[6.1]
  def change
    rename_table :dalle3_image_mappings_quiz, :dalle3_image_mappings_quizzes
  end
end
