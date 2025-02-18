"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "@/lib/axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { ICompetition } from "../types/competition";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const TeamSchema = z.object({
  competition_id: z.number(),
  team_name: z.string().min(1, "Team name is required"),
  no_hp: z.string().min(1, "Phone number is required"),
  team_members: z
    .array(
      z.object({
        name: z.string().min(1, "Player name is required"),
        id_game: z.string().min(1, "Game ID is required"),
        nickname: z.string().min(1, "Nickname is required"),
        position: z.enum(["leader", "player"]),
        domicile: z.string().min(1, "Domicile is required"),
      })
    )
    .min(2, "A team must have at least 2 members")
    .max(6, "A team can only have 6 members"),
});

type TeamFormType = z.infer<typeof TeamSchema>;

const TeamRegistrationForm = ({ data }: { data: ICompetition }) => {
  const router = useRouter();
  const form = useForm<TeamFormType>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      competition_id: data?.id,
      team_name: "",
      no_hp: "",
      team_members: [
        { name: "", id_game: "", nickname: "", domicile: "", position: "leader" },
        { name: "", id_game: "", nickname: "", domicile: "", position: "player" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "team_members",
  });

  const onSubmit = async (formData: TeamFormType) => {
      await axiosInstance.post("/registration", formData).then((res) => {
      Swal.fire({
        icon: "success",
        title: "Registration Success",
        text: res.data.message,
      });
      router.push("/order");
    }).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.response?.data?.message,
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase">{data.game.name}</CardTitle>
            <CardDescription>Judul game yang menjadi ajang pertandingan</CardDescription>
          </CardHeader>
        </Card>

        {/* Team Info */}
        <Card className="p-4 space-y-4 border">
          <FormField
            control={form.control}
            name="team_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name / Nama Tim</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Team Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="no_hp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number / Nomor Handphone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Contact Number" {...field} />
                </FormControl>
                <FormDescription>Isi dengan data ketua tim</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* Team Members */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id} className="p-4 space-y-4 border">
              <Label>Player {index + 1}</Label>
              
              <FormField
                control={form.control}
                name={`team_members.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`team_members.${index}.id_game`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Game ID" {...field} />
                    </FormControl>
                    <FormDescription>Isi dengan &apos;-&apos; jika tidak ada</FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`team_members.${index}.nickname`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input placeholder="Nickname Game" {...field} />
                    </FormControl>
                    <FormDescription>Isi dengan &apos;-&apos; jika tidak ada</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`team_members.${index}.domicile`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domisili / Alamat</FormLabel>
                    <FormControl>
                      <Input placeholder="Tempat Tinggal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`team_members.${index}.position`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="leader">Leader / Ketua Tim</SelectItem>
                        <SelectItem value="player">Player / Anggota Tim</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 2 && (
                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                  Remove Player
                </Button>
              )}
            </Card>
          ))}

          {fields.length < 6 && (
            <Button type="button" onClick={() => append({ name: "", id_game: "", nickname: "", domicile: "", position: "player" })}>
              Add Player
            </Button>
          )}
        </div>

        <Button type="submit" className="w-full bg-[#ff0000] text-white hover:bg-red-600 disabled:bg-red-400 font-bold" disabled={!data.status?.data.is_open}>
          Daftar Sekarang
        </Button>
      </form>
    </Form>
  );
};

export default TeamRegistrationForm;
