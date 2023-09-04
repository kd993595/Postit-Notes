package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) shutdown(ctx context.Context) {}

// Greet returns a greeting for the given name
func (a *App) SaveData(data string) {
	file, err := os.Create("data.txt")

	if err != nil {
		log.Fatalf("failed creating file: %s", err)
	}

	defer file.Close()

	length, err := file.WriteString(data)
	if err != nil {
		log.Fatalf("failed writing to file: %s", err)
	}

	fmt.Printf("\nWrote data to file: %s. Length: %d bytes", file.Name(), length)
}

func (a *App) LoadData() string {
	data, err := ioutil.ReadFile("data.txt")

	if err != nil {
		//log.Panicf("failed reading data from file: %s", err)
		return ""
	}
	fmt.Printf("\nFile Name: %s", "data.txt")
	fmt.Printf("\nSize: %d bytes", len(data))

	return string(data)
}
