# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_01_25_153148) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answer_data", force: :cascade do |t|
    t.string "student_id"
    t.string "question_id"
    t.text "answer"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "conversation_data", force: :cascade do |t|
    t.string "student_id"
    t.string "role"
    t.text "prompt"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "dalle3_image_mappings", force: :cascade do |t|
    t.bigint "id_conversation_data"
    t.string "image_url_local"
  end

  create_table "dalle3_image_mappings_quizzes", force: :cascade do |t|
    t.bigint "id_quiz_conversation_data"
    t.string "image_url_local"
  end

  create_table "quiz_conversation_data", force: :cascade do |t|
    t.string "student_id"
    t.string "role"
    t.text "prompt"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "student_info", force: :cascade do |t|
    t.string "student_id"
    t.string "student_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
