# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160914203500) do

  create_table "group_states", force: :cascade do |t|
    t.string   "name",       limit: 100, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "groups", force: :cascade do |t|
    t.string   "name",           limit: 100, null: false
    t.text     "message",        limit: 500
    t.string   "logo",           limit: 255
    t.integer  "group_state_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "groups", ["group_state_id"], name: "index_groups_on_group_state_id"

  create_table "groups_species", force: :cascade do |t|
    t.integer  "group_id"
    t.integer  "species_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "groups_species", ["group_id"], name: "index_groups_species_on_group_id"
  add_index "groups_species", ["species_id"], name: "index_groups_species_on_species_id"

  create_table "groups_users", force: :cascade do |t|
    t.integer  "group_id"
    t.integer  "user_id"
    t.integer  "groups_users_state_id"
    t.boolean  "is_admin",              null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "groups_users", ["group_id"], name: "index_groups_users_on_group_id"
  add_index "groups_users", ["groups_users_state_id"], name: "index_groups_users_on_groups_users_state_id"
  add_index "groups_users", ["user_id"], name: "index_groups_users_on_user_id"

  create_table "groups_users_states", force: :cascade do |t|
    t.string   "name",       limit: 100, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "species", force: :cascade do |t|
    t.string   "sci_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "species", ["sci_name"], name: "index_species_on_sci_name", unique: true

  create_table "tasks", force: :cascade do |t|
    t.integer  "species_id"
    t.integer  "user_id"
    t.integer  "group_id"
    t.integer  "task_type_id"
    t.boolean  "complete",     default: false, null: false
    t.boolean  "active",       default: true,  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tasks", ["group_id"], name: "index_tasks_on_group_id"
  add_index "tasks", ["species_id"], name: "index_tasks_on_species_id"
  add_index "tasks", ["task_type_id"], name: "index_tasks_on_task_type_id"
  add_index "tasks", ["user_id"], name: "index_tasks_on_user_id"

  create_table "tasks_types", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",                   limit: 100,              null: false
    t.string   "organization",           limit: 100
    t.string   "location",               limit: 100
    t.string   "expertise",              limit: 200
    t.text     "bio",                    limit: 600
    t.string   "avatarURL",              limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",                              default: "", null: false
    t.string   "encrypted_password",                 default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                      default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["name"], name: "index_users_on_name"
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
